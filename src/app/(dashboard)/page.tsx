export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border">
          <p className="text-sm text-muted-foreground">Total Recipes</p>
          <p className="text-2xl font-bold">24</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border">
          <p className="text-sm text-muted-foreground">Weekly Plans</p>
          <p className="text-2xl font-bold">3</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border">
          <p className="text-sm text-muted-foreground">Shopping Items</p>
          <p className="text-2xl font-bold">18</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border">
          <p className="text-sm text-muted-foreground">Completed Tasks</p>
          <p className="text-2xl font-bold">12</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h2 className="font-semibold mb-4">Recent Activity</h2>
        <p className="text-sm text-muted-foreground">
          Your latest meal plans and updates will appear here.
        </p>
      </div>
    </div>
  )
}
