type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

// Renders one or more schema.org JSON-LD blocks.
// Server component — safe to embed structured data without shipping JS.
export function JsonLd({ data }: JsonLdProps) {
  const items = Array.isArray(data) ? data : [data];
  return (
    <>
      {items.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}
