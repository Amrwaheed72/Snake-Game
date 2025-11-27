import  { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCcw } from "lucide-react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white p-4">
          <div className="max-w-md w-full bg-slate-800 rounded-2xl border border-slate-700 shadow-2xl p-8">
            <div className="flex items-center justify-center w-16 h-16 bg-red-500/10 rounded-full mx-auto mb-4">
              <AlertTriangle size={32} className="text-red-500" />
            </div>

            <h2 className="text-2xl font-bold text-center mb-2">
              Oops! Something went wrong
            </h2>

            <p className="text-slate-400 text-center mb-6">
              The game encountered an unexpected error. Don&apos;t worry, your
              progress is safe!
            </p>
            {process.env.NODE_ENV === "development" && this.state.error && (
              <details className="mb-6 bg-slate-900 rounded-lg p-4 text-xs">
                <summary className="cursor-pointer text-red-400 font-mono mb-2">
                  Error Details (Dev Only)
                </summary>
                <pre className="text-slate-300 overflow-auto">
                  {this.state.error.toString()}
                  {this.state.errorInfo && (
                    <>
                      {"\n\n"}
                      {this.state.errorInfo.componentStack}
                    </>
                  )}
                </pre>
              </details>
            )}

            <button
              type="button"
              onClick={this.handleReset}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-emerald-500 text-white rounded-full font-bold hover:bg-emerald-400 transition-all hover:scale-105 active:scale-95 shadow-lg"
            >
              <RefreshCcw size={20} />
              Try Again
            </button>

            <p className="text-xs text-slate-500 text-center mt-4">
              If this keeps happening, try refreshing the page
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
