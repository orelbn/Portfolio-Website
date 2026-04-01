import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Project } from "@/data/projects";
import { getSafeExternalUrl } from "@/lib/safe-url";

export function ProjectCard({
  youtubeId,
  customImage,
  description,
  technologies,
  title,
  href,
}: Project) {
  const safeHref = getSafeExternalUrl(href);

  return (
    <div className="flex flex-col gap-4 h-full group">
      <div className="aspect-video w-full overflow-hidden">
        {youtubeId ? (
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}`}
            title={title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : customImage ? (
          safeHref ? (
            <a
              href={safeHref}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full h-full cursor-pointer relative"
              aria-label={`Open ${title} in a new tab`}
            >
              <img
                src={customImage}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </a>
          ) : (
            <img
              src={customImage}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          )
        ) : safeHref ? (
          <a
            href={safeHref}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full h-full cursor-pointer relative"
            aria-label={`Open ${title} in a new tab`}
          />
        ) : (
          <div className="w-full h-full relative" />
        )}
      </div>

      <div className="flex flex-col flex-1 gap-3">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
          <div className="flex gap-1 shrink-0">
            {safeHref && (
              <Button
                nativeButton={false}
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
                render={
                  <a href={safeHref} target="_blank" rel="noopener noreferrer" title="View Code" />
                }
              >
                <img
                  src="/GitHub_Invertocat_White.svg"
                  alt=""
                  aria-hidden="true"
                  className="h-4 w-4"
                />
              </Button>
            )}
          </div>
        </div>

        <p className="text-foreground leading-relaxed line-clamp-3">{description}</p>

        <div className="mt-auto pt-2 flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <Badge key={tech} className="px-2.5 py-0.5 font-normal">
              {tech}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
