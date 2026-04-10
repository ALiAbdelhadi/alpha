import type { JsonLdSchema } from "@/lib/schema";

type JsonLdProps = {
  schemas:
    | Array<JsonLdSchema | null | undefined>
    | JsonLdSchema
    | null
    | undefined;
};

export function JsonLd({ schemas }: JsonLdProps) {
  const entries = (Array.isArray(schemas) ? schemas : [schemas]).filter(
    (schema): schema is JsonLdSchema => Boolean(schema),
  );

  if (entries.length === 0) {
    return null;
  }

  return (
    <>
      {entries.map((schema, index) => (
        <script
          key={String(schema["@id"] ?? schema["@type"] ?? index)}
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          type="application/ld+json"
        />
      ))}
    </>
  );
}
