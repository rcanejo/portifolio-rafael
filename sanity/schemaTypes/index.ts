import { defineField, defineType } from "sanity";

const localizedString = defineType({
  name: "localizedString",
  title: "Texto PT/EN",
  type: "object",
  fields: [
    defineField({ name: "pt", title: "Português", type: "string" }),
    defineField({ name: "en", title: "English", type: "string" }),
  ],
});

export const project = defineType({
  name: "project",
  title: "Projeto",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Título", type: "localizedString" }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title.pt" } }),
    defineField({ name: "summary", title: "Resumo", type: "localizedString" }),
    defineField({ name: "description", title: "Descrição", type: "localizedString" }),
    defineField({ name: "tags", title: "Tags", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "featured", title: "Destaque", type: "boolean", initialValue: false }),
  ],
});

export const certificate = defineType({
  name: "certificate",
  title: "Certificado",
  type: "document",
  fields: [
    defineField({ name: "year", title: "Ano", type: "number" }),
    defineField({ name: "course", title: "Curso", type: "localizedString" }),
    defineField({ name: "institution", title: "Instituição", type: "string" }),
    defineField({ name: "highlight", title: "Destaque", type: "boolean" }),
  ],
});

export const service = defineType({
  name: "service",
  title: "Serviço",
  type: "document",
  fields: [
    defineField({ name: "icon", title: "Ícone", type: "string" }),
    defineField({ name: "title", title: "Título", type: "localizedString" }),
    defineField({ name: "description", title: "Descrição", type: "localizedString" }),
  ],
});

export const stat = defineType({
  name: "stat",
  title: "Estatística",
  type: "document",
  fields: [
    defineField({ name: "value", title: "Valor", type: "number" }),
    defineField({ name: "suffix", title: "Sufixo", type: "string" }),
    defineField({ name: "label", title: "Rótulo", type: "localizedString" }),
  ],
});

export const schemaTypes = [localizedString, project, certificate, service, stat];
