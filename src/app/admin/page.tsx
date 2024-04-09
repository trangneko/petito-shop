import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import db from "@/db/db";
import { formatCurrency, formatNumber } from "@/lib/formatters";

async function getSalesData() {
  const data = await db.order.aggregate({
    _sum: { pricePaidInVnd: true },
    _count: true,
  });

  return {
    amount: (data._sum.pricePaidInVnd || 0) / 100,
    numberOfSales: data._count,
  };
}


async function getUserData() {
  const [userCount, orderData] = await Promise.all([
    db.user.count(),
    db.order.aggregate({
      _sum: { pricePaidInVnd: true },
    }),
  ]);

  return {
    userCount, averangeValuePerUser: userCount === 0 ? 0 : (orderData._sum.pricePaidInVnd || 0) / userCount / 100
  }
}

async function getProductData() {
   const [activeCount, inactiveCount] = await Promise.all([
    db.product.count({ where: {isAvailableForPurchase: true}}),
    db.product.count({ where: { isAvailableForPurchase: false}})
   ])

   return {activeCount, inactiveCount}
}

export default async function AdminDashboard() {
    const [salesData, userData, productData] = await Promise.all([
        getSalesData(), getUserData(), getProductData()
    ])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <DashboardCard
        title="Doanh thu"
        subtitle={`Tổng cộng ${formatNumber(salesData.numberOfSales)} đơn`}
        body={formatCurrency(salesData.amount)}
      />

      <DashboardCard
        title="Khách hàng"
        subtitle={`Trung bình khách tiêu ${formatCurrency(userData.averangeValuePerUser)}`}
        body={formatNumber(userData.userCount)}
      />

<DashboardCard
        title="Active Products"
        subtitle={`${formatNumber(productData.inactiveCount)} inactive`}
        body={formatNumber(productData.activeCount)}
      />
    </div>
  );
}

type DashboardCardProps = {
  title: String;
  subtitle: String;
  body: String;
};
function DashboardCard({ title, subtitle, body }: DashboardCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{body}</p>
      </CardContent>
    </Card>
  );
}
