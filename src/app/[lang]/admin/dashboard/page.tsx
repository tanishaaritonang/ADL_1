import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function AdminDashboardPage() {
  // Mock data for analytics
  const analyticsData = [
    { id: 1, metric: "Total Posts", value: "42", change: "+12%" },
    { id: 2, metric: "Active Users", value: "1,248", change: "+8%" },
    { id: 3, metric: "Comments", value: "3,421", change: "+5%" },
    { id: 4, metric: "Page Views", value: "24,567", change: "+15%" },
  ];

  // Mock data for recent posts
  const recentPosts = [
    { id: 1, title: "Getting Started with Next.js 15", author: "Alex Johnson", date: "2025-09-15", status: "Published" },
    { id: 2, title: "Mastering Tailwind CSS in 2025", author: "Sam Smith", date: "2025-09-10", status: "Published" },
    { id: 3, title: "Building Accessible React Components", author: "Taylor Reed", date: "2025-09-05", status: "Published" },
    { id: 4, title: "State Management in Modern React", author: "Jordan Lee", date: "2025-08-28", status: "Draft" },
  ];

  // Mock data for user roles
  const userRoles = [
    { id: 1, name: "Alex Johnson", email: "alex@example.com", role: "Admin", status: "Active" },
    { id: 2, name: "Sam Smith", email: "sam@example.com", role: "Author", status: "Active" },
    { id: 3, name: "Taylor Reed", email: "taylor@example.com", role: "Author", status: "Active" },
    { id: 4, name: "Jordan Lee", email: "jordan@example.com", role: "Reader", status: "Active" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button>Export Report</Button>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {analyticsData.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <CardTitle>{item.metric}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">{item.value}</div>
              <div className="text-sm text-green-600">{item.change} from last month</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Posts and User Management */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Posts */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Posts</CardTitle>
            <CardDescription>Latest blog posts and their status</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentPosts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell className="font-medium">{post.title}</TableCell>
                    <TableCell>{post.author}</TableCell>
                    <TableCell>{post.date}</TableCell>
                    <TableCell>
                      <Badge variant={post.status === "Published" ? "default" : "secondary"}>
                        {post.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* User Management */}
        <Card>
          <CardHeader>
            <CardTitle>User Management</CardTitle>
            <CardDescription>Manage user roles and permissions</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {userRoles.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{user.role}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="default">{user.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">Edit</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}