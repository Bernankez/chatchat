"use client";

// i18n hack
// ref https://github.com/grigorii-zander/next-app-dir-i18next-no-locale-path-example

import i18next, { i18n } from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import resourcesToBackend from "i18next-resources-to-backend";
import React, { useMemo } from "react";
import { I18nextProvider as Provider, initReactI18next } from "react-i18next";
import { createOptions } from "./settings";

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(
    resourcesToBackend(
      (language: string, namespace: string) => import(`../public/locales/${language}/${namespace}.json`),
    ),
  )
  .init({
    ...createOptions(),
    detection: {
      caches: ["cookie"],
    },
  });

export async function loadNamespace(namespace: string) {
  return new Promise<i18n>((resolve) => {
    i18next.loadNamespaces(namespace).then(() => {
      resolve(i18next);
    });
  });
}

export function I18nProvider({ children, language }: { children: React.ReactNode; language: string }) {
  useMemo(() => {
    i18next.changeLanguage(language);
  }, []);
  return <Provider i18n={i18next}>{children}</Provider>;
}
