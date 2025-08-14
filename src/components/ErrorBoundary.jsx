import React, { Component } from "react";

export function ErrorScreen({ error }) {
  return (
    <div
      className="bg-[#efacac]
        border-4
        border-double
        border-[darkred]
        text-[darkred]
        p-4"
    >
      <h3>We are sorry... something went wrong</h3>
      <p>We cannot process your request at this moment</p>
      <p>ERROR: {error.message}</p>
    </div>
  );
}

export default class ErrorBoundary extends Component {
  static defaultProps = {
    fallback: ErrorScreen,
  };

  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught:", error, info);
  }

  render() {
    const { error } = this.state;
    const { children, fallback: Fallback } = this.props;

    if (error) {
      return <Fallback error={error} />;
    }

    return children;
  }
}
