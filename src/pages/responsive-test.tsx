import { PageLayout } from '@/components/layout/PageLayout';

const ResponsiveTest = () => {
  const breakpoints = [
    { name: 'Mobile (Small)', width: '375px', class: 'w-full max-w-[375px]' },
    { name: 'Mobile (Medium)', width: '428px', class: 'w-full max-w-[428px]' },
    { name: 'Tablet', width: '768px', class: 'w-full max-w-[768px]' },
    { name: 'Laptop', width: '1024px', class: 'w-full max-w-[1024px]' },
    { name: 'Desktop', width: '1440px', class: 'w-full max-w-[1440px]' },
    { name: 'Full HD', width: '1920px', class: 'w-full max-w-[1920px]' },
  ];

  return (
    <PageLayout title="Responsive Design Test">
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Responsive Design Test
          </h1>
          
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Viewport Sizes</h2>
            <p className="text-gray-600 mb-4">
              This page helps you test how your portfolio looks at different screen sizes.
              The viewport sizes below represent common device breakpoints.
            </p>
            
            <div className="space-y-6 mt-8">
              {breakpoints.map((breakpoint, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-gray-900">{breakpoint.name}</h3>
                    <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {breakpoint.width}
                    </span>
                  </div>
                  <div className="bg-white border border-gray-200 rounded overflow-hidden">
                    <div className={`h-64 overflow-auto mx-auto border border-gray-200 bg-white ${breakpoint.class}`}>
                      <div className="p-4">
                        <h4 className="font-medium mb-2">Content Area</h4>
                        <p className="text-sm text-gray-600">
                          This is how content will look on a {breakpoint.name.toLowerCase()} screen.
                        </p>
                        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="bg-blue-50 p-3 rounded border border-blue-100">
                            <p className="text-xs text-blue-800">Card 1</p>
                          </div>
                          <div className="bg-green-50 p-3 rounded border border-green-100">
                            <p className="text-xs text-green-800">Card 2</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Responsive Helpers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Common Breakpoints</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex justify-between">
                    <span>sm:</span>
                    <span>640px</span>
                  </li>
                  <li className="flex justify-between">
                    <span>md:</span>
                    <span>768px</span>
                  </li>
                  <li className="flex justify-between">
                    <span>lg:</span>
                    <span>1024px</span>
                  </li>
                  <li className="flex justify-between">
                    <span>xl:</span>
                    <span>1280px</span>
                  </li>
                  <li className="flex justify-between">
                    <span>2xl:</span>
                    <span>1536px</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Testing Tips</h3>
                <ul className="space-y-2 text-sm text-gray-600 list-disc pl-5">
                  <li>Test on actual devices when possible</li>
                  <li>Check touch targets (min 44×44px)</li>
                  <li>Verify text remains readable</li>
                  <li>Test landscape and portrait orientations</li>
                  <li>Check for overflow issues</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ResponsiveTest;
