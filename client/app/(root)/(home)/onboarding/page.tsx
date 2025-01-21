'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import localForage from "localforage"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Shield,
  Scale,
  Calendar,
  Dumbbell,
  Soup,
  Calculator,
  Brain,
  Leaf,
  Moon,
  UserCircle2,
  Utensils,
  Fish,
  Salad,
  Heart,
  Wheat,
  Candy,
  ShoppingBag,
  Bell,
  Sparkles,
  Apple,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { LucideIcon } from "lucide-react"

interface Goal {
  id: string
  label: string
  icon: LucideIcon
}

interface DietType {
  id: string
  label: string
  description: string
  icon: LucideIcon
}

interface FormData {
  name: string
  age: string
  dietaryPreferences: string[]
  healthGoals: string[]
  allergies: string[]
  shoppingPreferences: string[]
  activityLevel: string
  alerts: string[]
  specialInstructions: string
  consumptionTipPreference: string
  favoriteFoods: string[]
}

export default function UserProfileForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    age: "",
    dietaryPreferences: [],
    healthGoals: [],
    allergies: [],
    shoppingPreferences: [],
    activityLevel: "",
    alerts: [],
    specialInstructions: "",
    consumptionTipPreference: "",
    favoriteFoods: [],
  })

  useEffect(() => {
    const loadSavedData = async () => {
      const savedData = await localForage.getItem<FormData>("userProfileData")
      if (savedData) {
        setFormData(savedData)
      }
    }
    loadSavedData()
  }, [])

  const dietaryPreferences = [
    { id: "vegan", label: "Vegan", icon: Leaf },
    { id: "vegetarian", label: "Vegetarian", icon: Salad },
    { id: "gluten-free", label: "Gluten-free", icon: Wheat },
  ]

  const healthGoals = [
    { id: "weight-management", label: "Weight management", icon: Scale },
    { id: "improve-gut-health", label: "Improve gut health", icon: Soup },
  ]

  const allergies = [
    { id: "nuts", label: "Nuts", icon: Apple },
    { id: "soy", label: "Soy", icon: Sparkles },
  ]

  const shoppingPreferences = [
    { id: "organic", label: "Prefers organic products", icon: Leaf },
    { id: "moderate-budget", label: "Moderate budget", icon: ShoppingBag },
  ]

  const activityLevels = [
    { id: "sedentary", label: "Sedentary", icon: Moon },
    { id: "lightly-active", label: "Lightly active", icon: Utensils },
    { id: "moderately-active", label: "Moderately active", icon: Dumbbell },
    { id: "very-active", label: "Very active", icon: Heart },
    { id: "extra-active", label: "Extra active", icon: Sparkles },
  ]

  const alerts = [
    { id: "sugar", label: "Notifications for sugar", icon: Candy },
    { id: "high-sodium", label: "Notifications for high sodium products", icon: Bell },
  ]

  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (category: keyof FormData, itemId: string) => {
    setFormData((prev) => {
      const array = prev[category] as string[]
      return {
        ...prev,
        [category]: array.includes(itemId) ? array.filter((id) => id !== itemId) : [...array, itemId],
      }
    })
  }

  const handleNext = () => {
    if (step < 5) {
      setStep((prev) => prev + 1)
    } else {
      handleSubmit()
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => prev - 1)
    }
  }

  const handleSubmit = async () => {
    try {
      await localForage.setItem("userProfileData", formData)
      console.log("Profile saved successfully")
      router.push("/scan")
    } catch (error) {
      console.error("Error saving profile:", error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-blue-200 dark:from-gray-900 dark:to-gray-800 p-4">
      <Card className="w-full max-w-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-xl rounded-3xl overflow-hidden">
        <div className="p-8 space-y-8">
          <div className="space-y-2">
            <div className="flex justify-between mb-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className={`w-1/5 h-2 rounded-full ${
                    i <= step ? "bg-gradient-to-r from-green-400 to-blue-500" : "bg-gray-200 dark:bg-gray-700"
                  } ${i !== 5 ? "mr-1" : ""}`}
                />
              ))}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center font-medium">Step {step} of 5</p>
          </div>

          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Personal Information
              </h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-lg font-medium">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    className="mt-1 text-lg"
                  />
                </div>
                <div>
                  <Label htmlFor="age" className="text-lg font-medium">Age</Label>
                  <Input
                    id="age"
                    name="age"
                    type="number"
                    value={formData.age}
                    onChange={handleInputChange}
                    placeholder="Enter your age"
                    className="mt-1 text-lg"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Dietary Preferences and Health Goals
              </h2>
              <div className="space-y-6">
                <div>
                  <Label className="text-lg font-medium mb-2 block">Dietary Preferences</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {dietaryPreferences.map((pref) => (
                      <div key={pref.id} className="flex items-center space-x-3 bg-white dark:bg-gray-700 p-3 rounded-lg shadow-sm">
                        <Checkbox
                          id={pref.id}
                          checked={formData.dietaryPreferences.includes(pref.id)}
                          onCheckedChange={() => handleCheckboxChange("dietaryPreferences", pref.id)}
                        />
                        <label htmlFor={pref.id} className="text-sm font-medium flex items-center space-x-2">
                          {pref.icon && <pref.icon className="w-5 h-5" />}
                          <span>{pref.label}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <Label className="text-lg font-medium mb-2 block">Health Goals</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {healthGoals.map((goal) => (
                      <div key={goal.id} className="flex items-center space-x-3 bg-white dark:bg-gray-700 p-3 rounded-lg shadow-sm">
                        <Checkbox
                          id={goal.id}
                          checked={formData.healthGoals.includes(goal.id)}
                          onCheckedChange={() => handleCheckboxChange("healthGoals", goal.id)}
                        />
                        <label htmlFor={goal.id} className="text-sm font-medium flex items-center space-x-2">
                          {goal.icon && <goal.icon className="w-5 h-5" />}
                          <span>{goal.label}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Allergies and Shopping Preferences
              </h2>
              <div className="space-y-6">
                <div>
                  <Label className="text-lg font-medium mb-2 block">Allergies</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {allergies.map((allergy) => (
                      <div key={allergy.id} className="flex items-center space-x-3 bg-white dark:bg-gray-700 p-3 rounded-lg shadow-sm">
                        <Checkbox
                          id={allergy.id}
                          checked={formData.allergies.includes(allergy.id)}
                          onCheckedChange={() => handleCheckboxChange("allergies", allergy.id)}
                        />
                        <label htmlFor={allergy.id} className="text-sm font-medium flex items-center space-x-2">
                          {allergy.icon && <allergy.icon className="w-5 h-5" />}
                          <span>{allergy.label}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <Label className="text-lg font-medium mb-2 block">Shopping Preferences</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {shoppingPreferences.map((pref) => (
                      <div key={pref.id} className="flex items-center space-x-3 bg-white dark:bg-gray-700 p-3 rounded-lg shadow-sm">
                        <Checkbox
                          id={pref.id}
                          checked={formData.shoppingPreferences.includes(pref.id)}
                          onCheckedChange={() => handleCheckboxChange("shoppingPreferences", pref.id)}
                        />
                        <label htmlFor={pref.id} className="text-sm font-medium flex items-center space-x-2">
                          {pref.icon && <pref.icon className="w-5 h-5" />}
                          <span>{pref.label}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Activity Level and Alerts
              </h2>
              <div className="space-y-6">
                <div>
                  <Label className="text-lg font-medium mb-2 block">Activity Level</Label>
                  <RadioGroup
                    value={formData.activityLevel}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, activityLevel: value }))}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                  >
                    {activityLevels.map((level) => (
                      <div key={level.id} className="flex items-center space-x-3 bg-white dark:bg-gray-700 p-3 rounded-lg shadow-sm">
                        <RadioGroupItem value={level.id} id={level.id} />
                        <Label htmlFor={level.id} className="text-sm font-medium flex items-center space-x-2">
                          {level.icon && <level.icon className="w-5 h-5" />}
                          <span>{level.label}</span>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
                <div>
                  <Label className="text-lg font-medium mb-2 block">Alerts</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {alerts.map((alert) => (
                      <div key={alert.id} className="flex items-center space-x-3 bg-white dark:bg-gray-700 p-3 rounded-lg shadow-sm">
                        <Checkbox
                          id={alert.id}
                          checked={formData.alerts.includes(alert.id)}
                          onCheckedChange={() => handleCheckboxChange("alerts", alert.id)}
                        />
                        <label htmlFor={alert.id} className="text-sm font-medium flex items-center space-x-2">
                          {alert.icon && <alert.icon className="w-5 h-5" />}
                          <span>{alert.label}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Additional Preferences
              </h2>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="specialInstructions" className="text-lg font-medium">Special Instructions</Label>
                  <Textarea
                    id="specialInstructions"
                    name="specialInstructions"
                    value={formData.specialInstructions}
                    onChange={handleInputChange}
                    placeholder="Enter any special instructions"
                    className="mt-1"
                    rows={4}
                  />
                </div>
                <div>
                  <Label htmlFor="consumptionTipPreference" className="text-lg font-medium">Consumption Tip Preference</Label>
                  <Select
                    value={formData.consumptionTipPreference}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, consumptionTipPreference: value }))}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select your preference" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="direct-comparisons">Direct comparisons</SelectItem>
                      <SelectItem value="detailed-analysis">Detailed analysis</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="favoriteFoods" className="text-lg font-medium">Favorite Foods</Label>
                  <Input
                    id="favoriteFoods"
                    name="favoriteFoods"
                    value={formData.favoriteFoods.join(", ")}
                    onChange={(e) => setFormData((prev) => ({ ...prev, favoriteFoods: e.target.value.split(", ") }))}
                    placeholder="Enter your favorite foods (comma-separated)"
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8">
            <Button
              onClick={handleBack}
              disabled={step === 1}
              variant="outline"
              className="rounded-full bg-white/50 dark:bg-gray-700/50 hover:bg-white/80 dark:hover:bg-gray-700/80 px-6 py-2 text-lg flex items-center"
            >
              <ChevronLeft className="w-5 h-5 mr-2" /> Back
            </Button>
            <Button
              onClick={handleNext}
              className="rounded-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-6 py-2 text-lg flex items-center"
            >
              {step === 5 ? "Complete" : "Next"} <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}