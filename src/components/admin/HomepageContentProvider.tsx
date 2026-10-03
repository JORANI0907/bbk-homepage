"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type ContentValue = {
  src?: string;
  alt?: string;
  text?: string;
  [key: string]: unknown;
};

type ContentMap = Record<string, ContentValue>;

type ContentContextValue = {
  content: ContentMap;
  loading: boolean;
  get: (key: string) => ContentValue | undefined;
  update: (key: string, value: ContentValue) => void;
  refresh: () => Promise<void>;
};

const HomepageContentContext = createContext<ContentContextValue>({
  content: {},
  loading: true,
  get: () => undefined,
  update: () => {},
  refresh: async () => {},
});

export function HomepageContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<ContentMap>({});
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/homepage-content", { cache: "no-store" });
      if (!res.ok) {
        setContent({});
        return;
      }
      const data = await res.json();
      setContent(data.content ?? {});
    } catch {
      setContent({});
    } finally {
      setLoading(false);
    }
  }, []);

  const get = useCallback(
    (key: string) => content[key],
    [content],
  );

  const update = useCallback((key: string, value: ContentValue) => {
    setContent((prev) => ({ ...prev, [key]: value }));
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <HomepageContentContext.Provider
      value={{ content, loading, get, update, refresh }}
    >
      {children}
    </HomepageContentContext.Provider>
  );
}

export function useHomepageContent() {
  return useContext(HomepageContentContext);
}
