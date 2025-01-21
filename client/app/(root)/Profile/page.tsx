"use client";

import { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Edit,
  Flame,
  Apple,
  Droplet,
  Dumbbell,
  Loader2,
  Mail,
  Calendar,
  AlertCircle,
  CheckCircle,
  User,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import Image from "next/image";

export default function ProfilePage() {
  const { user, error, isLoading } = useUser();
  const [caloriesBurned, setCaloriesBurned] = useState(1800);
  const [caloriesConsumed, setCaloriesConsumed] = useState(1500);
  const calorieGoal = 2000;

  const nutritionData = [
    { name: "Protein", amount: 75, goal: 100, unit: "g" },
    { name: "Carbs", amount: 200, goal: 250, unit: "g" },
    { name: "Fat", amount: 55, goal: 65, unit: "g" },
  ];

  const activityData = [
    { name: "Steps", amount: 8500, goal: 10000, unit: "" },
    { name: "Water", amount: 1.5, goal: 2, unit: "L" },
    { name: "Sleep", amount: 7, goal: 8, unit: "hrs" },
  ];

  const calorieData = [
    { name: "Mon", consumed: 1800, burned: 2000 },
    { name: "Tue", consumed: 2000, burned: 1900 },
    { name: "Wed", consumed: 1700, burned: 2100 },
    { name: "Thu", consumed: 1900, burned: 2000 },
    { name: "Fri", consumed: 2100, burned: 2200 },
    { name: "Sat", consumed: 2300, burned: 1800 },
    { name: "Sun", consumed: 1500, burned: 1800 },
  ];

  const macroData = [
    { name: "Protein", value: 75 },
    { name: "Carbs", value: 200 },
    { name: "Fat", value: 55 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-lg text-foreground">Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen p-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-4">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Authentication Required</AlertTitle>
          <AlertDescription>
            Please log in to view your profile.
          </AlertDescription>
        </Alert>
        <Button asChild className="mt-4">
          <a href="/api/auth/login">Log In</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-2xl font-bold dark:text-white">Profile</h1>
          <Button variant="ghost" size="icon">
            <Edit className="h-6 w-6" />
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-6 mb-6">
          <Card className="flex-1">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage
                    src={user.picture || "/placeholder.svg?height=80&width=80"}
                    alt={user.name || "User avatar"}
                  />
                  <AvatarFallback>
                    {user.name ? user.name.charAt(0) : "U"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-semibold dark:text-white">
                    {user.name}
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400">
                    @{user.nickname}
                  </p>
                  <div className="flex items-center text-sm text-muted-foreground mt-1">
                    <Mail className="w-4 h-4 mr-2" />
                    <span>{user.email}</span>
                    {user.email_verified && (
                      <Badge variant="secondary" className="ml-2">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="flex-1">
            <CardHeader>
              <CardTitle>Daily Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium dark:text-gray-300">
                      Calories Burned
                    </span>
                    <span className="text-sm font-medium dark:text-gray-300">
                      {caloriesBurned} / {calorieGoal}
                    </span>
                  </div>
                  <Progress
                    value={(caloriesBurned / calorieGoal) * 100}
                    className="h-2"
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium dark:text-gray-300">
                      Calories Consumed
                    </span>
                    <span className="text-sm font-medium dark:text-gray-300">
                      {caloriesConsumed} / {calorieGoal}
                    </span>
                  </div>
                  <Progress
                    value={(caloriesConsumed / calorieGoal) * 100}
                    className="h-2"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Calorie Intake vs Burn</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  consumed: {
                    label: "Calories Consumed",
                    color: "hsl(var(--chart-1))",
                  },
                  burned: {
                    label: "Calories Burned",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={calorieData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey="consumed"
                      stroke="var(--color-consumed)"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="burned"
                      stroke="var(--color-burned)"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Macronutrient Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={macroData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {macroData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center mt-4">
                {macroData.map((entry, index) => (
                  <div
                    key={`legend-${index}`}
                    className="flex items-center mx-2"
                  >
                    <div
                      className="w-3 h-3 rounded-full mr-1"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    ></div>
                    <span className="text-sm dark:text-gray-300">
                      {entry.name}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="nutrition" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>
          <TabsContent value="nutrition">
            <Card>
              <CardHeader>
                <CardTitle>Nutrition Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {nutritionData.map((item) => (
                    <div key={item.name}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium dark:text-gray-300">
                          {item.name}
                        </span>
                        <span className="text-sm font-medium dark:text-gray-300">
                          {item.amount} / {item.goal} {item.unit}
                        </span>
                      </div>
                      <Progress
                        value={(item.amount / item.goal) * 100}
                        className="h-2"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle>Activity Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activityData.map((item) => (
                    <div key={item.name}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium dark:text-gray-300">
                          {item.name}
                        </span>
                        <span className="text-sm font-medium dark:text-gray-300">
                          {item.amount} / {item.goal} {item.unit}
                        </span>
                      </div>
                      <Progress
                        value={(item.amount / item.goal) * 100}
                        className="h-2"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <Flame className="h-8 w-8 text-orange-500 mb-2" />
              <p className="text-2xl font-semibold dark:text-white">
                {caloriesBurned}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Calories Burned
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <Apple className="h-8 w-8 text-green-500 mb-2" />
              <p className="text-2xl font-semibold dark:text-white">
                {caloriesConsumed}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Calories Consumed
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <Droplet className="h-8 w-8 text-blue-500 mb-2" />
              <p className="text-2xl font-semibold dark:text-white">1.5L</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Water Intake
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <Dumbbell className="h-8 w-8 text-purple-500 mb-2" />
              <p className="text-2xl font-semibold dark:text-white">45 min</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Workout Time
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 flex justify-center">
          <Button asChild variant="outline">
            <a href="/api/auth/logout">Log Out</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
