import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Project } from "@/data/projects";
import { Github, Globe } from "lucide-react";

export function ProjectCard({
  youtubeId,
  customImage,
  description,
  technologies,
  title,
  href,
  link,
}: Project) {
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
          <div
            className="w-full h-full cursor-pointer relative"
            onClick={href ? () => window.open(href, "_blank") : undefined}
          >
            <img
              src={customImage}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </div>
        ) : (
          <div
            className="w-full  h-full cursor-pointer relative"
            onClick={href ? () => window.open(href, "_blank") : undefined}
          ></div>
        )}
      </div>

      <div className="flex flex-col flex-1 gap-3">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
          <div className="flex gap-1 shrink-0">
            {link && (
              <Button
                nativeButton={false}
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
                render={
                  <a
                    href={link}
                    target="_blank"
                    rel="noreferrer"
                    title="Visit Website"
                  />
                }
              >
                <Globe className="h-4 w-4" />
              </Button>
            )}
            {href && (
              <Button
                nativeButton={false}
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
                render={
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    title="View Code"
                  />
                }
              >
                <Github className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        <p className="text-foreground leading-relaxed line-clamp-3">
          {description}
        </p>

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
