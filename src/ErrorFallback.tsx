import { Button } from "./components/ui/button";
import { WarningCircle, ArrowClockwise } from "@phosphor-icons/react";

export const ErrorFallback = ({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) => {
  // When encountering an error in the development mode, rethrow it and don't display the boundary.
  // The parent UI will take care of showing a more helpful dialog.
  if (import.meta.env.DEV) throw error;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-6 rounded-lg border border-destructive/50 bg-destructive/10 p-4">
          <div className="flex items-start gap-3">
            <WarningCircle className="mt-0.5 shrink-0 text-destructive" size={20} weight="fill" />
            <div>
              <h2 className="font-semibold text-destructive">Something went wrong</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Something unexpected happened while running the application. The error details are shown below.
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-card border rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-sm text-muted-foreground mb-2">Error Details:</h3>
          <pre className="text-xs text-destructive bg-muted/50 p-3 rounded border overflow-auto max-h-32">
            {error.message}
          </pre>
        </div>
        
        <Button 
          onClick={resetErrorBoundary} 
          className="w-full"
          variant="outline"
        >
          <ArrowClockwise className="mr-2" size={16} />
          Try Again
        </Button>
      </div>
    </div>
  );
}
