import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"
import Link from "next/link"

export function CompanyProfile() {
  return (
    <Card>
      <CardHeader className="flex flex-col items-center text-center">
        <Logo size="md" />
        <CardTitle className="mt-2">Access&Co</CardTitle>
        <CardDescription>The all-in-one intelligent global platform</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Revolutionizing how people connect, invest, and grow on a global scale.
        </p>
        <div className="flex flex-col gap-2">
          <Button asChild variant="outline" size="sm">
            <Link href="/company">About Us</Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link href="/invest">Investment Opportunities</Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link href="/partners">Business Partnerships</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
