import { Container } from "@/components/layout/container";
import { CaseFileCard } from "@/components/case-file-card";
import { getAllArchives } from "@/lib/archives";

export function AcademicArchive() {
  const archives = getAllArchives();

  return (
    <Container
      id="archives"
      component="section"
      wrapperClassName="py-24 border-t border-border"
      className="mx-auto max-w-7xl flex-1"
    >
      <div className="mb-16 grid items-end justify-between gap-4">
        <div>
          <div className="mb-3 font-mono text-xs text-primary">// ARCHIVE</div>
          <h2 className="mb-4 font-display text-4xl tracking-tighter md:text-6xl">
            ACADEMIC
            <br />
            ARCHIVES
          </h2>
          <div className="h-1 w-24 bg-primary"></div>
        </div>
        <p className="max-w-sm text-left text-muted-foreground">
          {archives.length} declassified case files from the Master of
          Intelligent Systems program. De Montfort University, 2019-2021.
          Graduated with distinction.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {archives.map((a) => (
          <CaseFileCard
            key={a.slug}
            code={a.code}
            slug={a.slug}
            title={a.title}
            description={a.description}
            grade={a.grade}
          />
        ))}
      </div>
    </Container>
  );
}
