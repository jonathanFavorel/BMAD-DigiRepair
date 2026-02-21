import { describe, it, expect } from "vitest";
import {
  createMockTable,
  clientsPolicies,
  adminUsersPolicies,
  type ClientRow,
  type AdminUserRow,
} from "./rls-test-helpers";

// Test data
const CLIENT_A_ID = "a1a1a1a1-1111-4aaa-aaaa-111111111111";
const CLIENT_B_ID = "b2b2b2b2-2222-4bbb-bbbb-222222222222";
const ADMIN_ID = "c3c3c3c3-3333-4ccc-cccc-333333333333";

const clientRows: ClientRow[] = [
  {
    id: CLIENT_A_ID,
    email: "clientA@example.com",
    phone: "0600000001",
    first_name: "Alice",
    last_name: "Dupont",
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: CLIENT_B_ID,
    email: "clientB@example.com",
    phone: "0600000002",
    first_name: "Bob",
    last_name: "Martin",
    created_at: "2026-01-02T00:00:00Z",
  },
];

const adminRows: AdminUserRow[] = [
  {
    id: ADMIN_ID,
    email: "favor@digirepair.fr",
    role: "admin",
    created_at: "2026-01-01T00:00:00Z",
  },
];

describe("RLS Isolation — clients table", () => {
  const clientsTable = createMockTable({
    rows: clientRows,
    policies: clientsPolicies,
  });

  it("client A can SELECT only their own row", () => {
    const results = clientsTable.select(CLIENT_A_ID, false);
    expect(results).toHaveLength(1);
    expect(results[0].id).toBe(CLIENT_A_ID);
  });

  it("client A cannot see client B data (isolation)", () => {
    const results = clientsTable.select(CLIENT_A_ID, false);
    const hasClientB = results.some((r) => r.id === CLIENT_B_ID);
    expect(hasClientB).toBe(false);
  });

  it("client A can UPDATE only their own row", () => {
    const ownRow = clientRows[0];
    const otherRow = clientRows[1];
    expect(clientsTable.canUpdate(ownRow, CLIENT_A_ID, false)).toBe(true);
    expect(clientsTable.canUpdate(otherRow, CLIENT_A_ID, false)).toBe(false);
  });

  it("client cannot DELETE any row", () => {
    expect(clientsTable.canDelete(clientRows[0], CLIENT_A_ID, false)).toBe(
      false,
    );
    expect(clientsTable.canDelete(clientRows[1], CLIENT_A_ID, false)).toBe(
      false,
    );
  });

  it("admin can SELECT all clients", () => {
    const results = clientsTable.select(ADMIN_ID, true);
    expect(results).toHaveLength(2);
  });

  it("admin can UPDATE any client", () => {
    expect(clientsTable.canUpdate(clientRows[0], ADMIN_ID, true)).toBe(true);
    expect(clientsTable.canUpdate(clientRows[1], ADMIN_ID, true)).toBe(true);
  });

  it("admin can DELETE any client", () => {
    expect(clientsTable.canDelete(clientRows[0], ADMIN_ID, true)).toBe(true);
    expect(clientsTable.canDelete(clientRows[1], ADMIN_ID, true)).toBe(true);
  });

  it("anonymous user (null) sees nothing", () => {
    const results = clientsTable.select(null, false);
    expect(results).toHaveLength(0);
  });

  it("anonymous user cannot UPDATE or DELETE", () => {
    expect(clientsTable.canUpdate(clientRows[0], null, false)).toBe(false);
    expect(clientsTable.canDelete(clientRows[0], null, false)).toBe(false);
  });
});

describe("RLS Isolation — admin_users table", () => {
  const adminTable = createMockTable({
    rows: adminRows,
    policies: adminUsersPolicies,
  });

  it("non-admin cannot SELECT admin_users (0 rows)", () => {
    const results = adminTable.select(CLIENT_A_ID, false);
    expect(results).toHaveLength(0);
  });

  it("admin can SELECT admin_users", () => {
    const results = adminTable.select(ADMIN_ID, true);
    expect(results).toHaveLength(1);
    expect(results[0].email).toBe("favor@digirepair.fr");
  });

  it("admin can INSERT into admin_users", () => {
    const newAdmin: AdminUserRow = {
      id: "d4d4d4d4-4444-4ddd-dddd-444444444444",
      email: "new@digirepair.fr",
      role: "admin",
      created_at: "2026-02-01T00:00:00Z",
    };
    expect(adminTable.canInsert(newAdmin, ADMIN_ID, true)).toBe(true);
  });

  it("non-admin cannot INSERT into admin_users", () => {
    const newAdmin: AdminUserRow = {
      id: "d4d4d4d4-4444-4ddd-dddd-444444444444",
      email: "hack@evil.com",
      role: "admin",
      created_at: "2026-02-01T00:00:00Z",
    };
    expect(adminTable.canInsert(newAdmin, CLIENT_A_ID, false)).toBe(false);
  });

  it("admin can UPDATE and DELETE admin_users", () => {
    expect(adminTable.canUpdate(adminRows[0], ADMIN_ID, true)).toBe(true);
    expect(adminTable.canDelete(adminRows[0], ADMIN_ID, true)).toBe(true);
  });

  it("non-admin cannot UPDATE or DELETE admin_users", () => {
    expect(adminTable.canUpdate(adminRows[0], CLIENT_A_ID, false)).toBe(false);
    expect(adminTable.canDelete(adminRows[0], CLIENT_A_ID, false)).toBe(false);
  });

  it("anonymous user sees nothing in admin_users", () => {
    const results = adminTable.select(null, false);
    expect(results).toHaveLength(0);
    expect(adminTable.canInsert(adminRows[0], null, false)).toBe(false);
  });
});
