import React, { Component, ErrorInfo, ReactNode } from "react";
import { Bug, RefreshCcw, Home } from "lucide-react";

interface Props {
  children: ReactNode;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  errorCount: number;
}

/**
 * Game-specific error boundary with auto-recovery
 * Attempts to reset the game state instead of showing error screen
 */
class GameErrorBoundary extends Component<Props, State> {
  private resetTimeout: NodeJS.Timeout | null = null;

  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      errorCount: 0,
    };
  }

  static getDerivedStateFromError(): Partial<State> {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Game error:", error, errorInfo);

    this.setState((prev) => ({
      errorCount: prev.errorCount + 1,
    }));

    // Auto-recovery for first few errors
    if (this.state.errorCount < 3) {
      console.log("Attempting auto-recovery...");
      this.resetTimeout = setTimeout(() => {
        this.handleReset();
      }, 2000);
    }
  }

  componentWillUnmount() {
    if (this.resetTimeout) {
      clearTimeout(this.resetTimeout);
    }
  }

  handleReset = () => {
    this.setState({ hasError: false });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  handleHardReset = () => {
    // Clear all state and reload
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      const isAutoRecovering = this.state.errorCount < 3;

      return (
        <div className="absolute inset-0 bg-slate-900/95 backdrop-blur-sm flex flex-col items-center justify-center rounded-lg z-40 p-4">
          <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-xl text-center max-w-sm">
            <div className="flex items-center justify-center w-16 h-16 bg-orange-500/10 rounded-full mx-auto mb-4">
              <Bug size={32} className="text-orange-500" />
            </div>

            <h3 className="text-xl font-bold mb-2">
              {isAutoRecovering ? "Game Hiccup!" : "Persistent Error"}
            </h3>

            {isAutoRecovering ? (
              <>
                <p className="text-slate-400 text-sm mb-4">
                  The game encountered an error but we&apos;re trying to recover...
                </p>
                <div className="flex items-center justify-center gap-2 text-emerald-400 text-sm">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-emerald-400 border-t-transparent" />
                  Auto-recovering
                </div>
              </>
            ) : (
              <>
                <p className="text-slate-400 text-sm mb-6">
                  We couldn&apos;t auto-recover. You may need to restart the game.
                </p>
                <div className="flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={this.handleReset}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg font-bold hover:bg-emerald-400 transition-all hover:scale-105 active:scale-95"
                  >
                    <RefreshCcw size={18} />
                    Try Again
                  </button>
                  <button
                    type="button"
                    onClick={this.handleHardReset}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-all"
                  >
                    <Home size={18} />
                    Full Reset
                  </button>
                </div>
              </>
            )}

            {this.state.errorCount > 0 && (
              <p className="text-xs text-slate-500 mt-4">
                Error count: {this.state.errorCount}
              </p>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default GameErrorBoundary;
