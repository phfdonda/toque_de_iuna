import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import db from "@/db/db";
import { formatCurrency, formatNumber } from "@/lib/formatters";

export default async function AdminPage() {
    const [salesData, userData, productData] = await Promise.all([
        getSalesData(),
        getUserData(),
        getProductData()
    ])
    

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <DashboardCard 
            title="Vendas" 
            subtitle={`${formatNumber(salesData.numberOfSales)} Vendas`} 
            body={`${formatCurrency(salesData.amount)} em vendas`} />
        <DashboardCard 
            title="Clientes" 
            subtitle={`${formatNumber(userData.userCount)} Clientes`}
            body={`Venda Média por Cliente: ${formatCurrency(userData.averageValuePerUser)} `}  />
        <DashboardCard 
            title="Produtos" 
            subtitle={`${formatNumber(productData.activeProducts)} Ativos`}
            body={`${formatNumber(productData.inactiveProducts)} Inativos`}  />
    </div>
  );
}

async function getSalesData(){
    const data = await db.order.aggregate({
        _sum: {
            pricePaidInCents: true
        },
        _count: true
    })

    return {
        amount: (data._sum.pricePaidInCents || 0)/100,
        numberOfSales: data._count
    }
}

async function getUserData(){
    const[userCount, orderData] = await Promise.all([
        db.user.count(),
        db.order.aggregate({
            _sum: {
                pricePaidInCents: true
            }
        })
    ])
    return{
        userCount,
        averageValuePerUser: userCount === 0 ? 0 : (orderData._sum.pricePaidInCents || 0) / userCount / 100
    }
}

async function getProductData(){
    const [activeProducts, inactiveProducts] = await Promise.all([
        db.product.count({
            where: {
                isAvailableForPurchase: true
            }
        }),
        db.product.count({
            where: {
                isAvailableForPurchase: false
            }
        })
    ])

    return {
        activeProducts: activeProducts || 0,
        inactiveProducts: inactiveProducts || 0
    }
}


type DashboardCardProps = {
    title: string;
    subtitle: string;
    body: string;
}

function DashboardCard({title, subtitle, body}: DashboardCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{subtitle}</CardDescription>
            </CardHeader>
            <CardContent>{body}</CardContent>
        </Card>
    )
}