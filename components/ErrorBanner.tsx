export default function ErrorBanner({ message }: { message: string }) {
    if (!message) return null;
  
    const isGenericError =
      message.toLowerCase().includes('fetch') ||
      message.toLowerCase().includes('failed') ||
      message.toLowerCase().includes('network');
  
    const displayMessage = isGenericError
      ? 'We couldn’t load the posts. Please try again later.'
      : message;
  
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 mb-4 rounded">
        <strong>Error:</strong> {displayMessage}
      </div>
    );
  }
  