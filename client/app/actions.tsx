'use server';

import { generateText } from 'ai';
import { google } from '@ai-sdk/google';

export async function getAnswer(question: string,userData:string) {
  console.log('getAnswer', question);
  const dummyUser={
    "name": "User",
    "age": 28,
    "dietaryPreferences": {
      "vegan": true,
      "glutenFree": true
    },
    "healthGoals": [
      "Weight management",
      "Improve gut health"
    ],
    "allergies": [
      "Nuts",
      "Soy"
    ],
    "shoppingPreferences": {
      "organic": true,
      "budget": "moderate"
    },
    "activityLevel": "Moderately active",
    "alerts": {
      "sugar": true,
      "highSodium": true
    },
    "specialInstructions": [
      "Display eco-friendly product options"
    ],
    "consumptionTipPreference": "Prefer direct comparisons and detailed analysis",
    "favoriteFoods": [
      "Kale",
      "Quinoa",
      "Almond milk"
    ]
  }
  
  const systemPrompt=`
   

Analyze the ingredient data of the scanned food item and provide a clear, one-line summary of its nutritional characteristics. Consider key indicators and offer personalized consumption advice based on the user's health profile. Follow these guidelines:

1. Carbohydrate & Sugar Content: Mention if the food is high or low in carbohydrates and sugar relative to fiber, protein, and fat. Provide a consumption tip based on balance and portion control. (e.g., "This food is high in carbohydrates and sugar but low in fiber and protein. Limit portions to avoid blood sugar spikes.")

2. Blood Sugar Index: Indicate whether the food has a high, moderate, or low impact on blood sugar. Tailor guidance based on potential effects on energy and blood glucose levels.

3. Potassium/Sodium Ratio: Summarize the potassium-to-sodium balance. If sodium is high and potassium low, advise caution for users monitoring blood pressure.

4. Potential Renal Acid Load (PRAL) Score: Note the PRAL score, indicating if the food is acidic or alkaline. Suggest moderation if the user has dietary restrictions related to acid levels.

5. Amino Acid Completeness: Evaluate if the food provides a complete amino acid profile or lacks certain essential amino acids. Suggest complementary foods if necessary.

6. Other Key Indicators: Highlight any other key nutrients or potential dietary concerns (e.g., additives, trans fats). Offer brief, actionable advice for healthier choices.

When summarizing, include links where applicable for users to explore detailed information, using the provided format for ease of access.

You will given user data also  whivh you can use to give user some insights ,give answer in an insightful manner: This 
{USER DATA}
${userData  ? userData : JSON.stringify(dummyUser, null, 2)}
{USER DATA}
 You can also use web search for inisights on recommended alternatives
 generate more insightful stats from Product json given by user
in markdown form  containg 4 insight with title and description of one line each

{PRODUCT JSON}
${JSON.stringify(question, null, 2)}
{PRODUCT JSON}
`
  const { text, finishReason, usage } = await generateText({
    model: google('gemini-1.5-flash'),
    prompt: systemPrompt,
   
  });

  return text;
}