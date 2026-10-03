"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type Admin = {
  id: string;
  name: string;
  role: "admin";
};

type AdminContextValue = {
  admin: Admin | null;
  loading: boolean;
  refresh: () => Promise<void>;
  logout: () => Promise<void>;
};

const AdminContext = createContext<AdminContextValue>({
  admin: null,
  loading: true,
  refresh: async () => {},
  logout: async () => {},
});

export function AdminProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/me", { cache: "no-store" });
      if (!res.ok) {
        setAdmin(null);
        return;
      }
      const data = await res.json();
      setAdmin(data.admin ?? null);
    } catch {
      setAdmin(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setAdmin(null);
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <AdminContext.Provider value={{ admin, loading, refresh, logout }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  return useContext(AdminContext);
}
