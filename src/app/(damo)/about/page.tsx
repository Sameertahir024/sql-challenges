export default function page() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">About</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">About SQL Challenges</h2>
          <p className="mb-4">
            SQL Challenges is a platform designed to help developers improve their SQL skills through practical exercises and real-world scenarios.
          </p>
          <p className="mb-4">
            Our mission is to make SQL learning interactive and engaging, providing hands-on experience with various database concepts and challenges.
          </p>
        </div>
        
        <div className="p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Features</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Interactive SQL challenges</li>
            <li>Real-world database scenarios</li>
            <li>Progress tracking</li>
            <li>Community support</li>
            <li>Regular updates with new challenges</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
