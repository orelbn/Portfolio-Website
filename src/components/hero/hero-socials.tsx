import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Github, Linkedin } from "lucide-react";

export function HeroSocials() {
  return (
    <TooltipProvider>
      <div className="flex justify-center items-center space-x-4">
        <Tooltip>
          <TooltipTrigger
            render={
              <Button
                className="rounded-full"
                size="icon"
                nativeButton={false}
                render={
                  <a
                    href="https://github.com/orelbn"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub"
                  />
                }
              />
            }
          >
            <Github className="w-5 h-5" />
          </TooltipTrigger>
          <TooltipContent>
            <p>Checkout my GitHub</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger
            render={
              <Button
                className="rounded-full"
                size="icon"
                nativeButton={false}
                render={
                  <a
                    href="https://linkedin.com/in/orelbn"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                  />
                }
              />
            }
          >
            <Linkedin className="w-5 h-5" />
          </TooltipTrigger>
          <TooltipContent>
            <p>Connect with me on Linkedin</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
