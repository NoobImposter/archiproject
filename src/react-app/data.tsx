// fitnessData.tsx

export const workoutRoutine = [
  {
    category: "Build Muscle",
    exercises: [
      { name: "Bench Press", sets: 4, reps: 10 },
      { name: "Deadlift", sets: 4, reps: 8 },
      { name: "Pull Ups", sets: 3, reps: 12 },
    ],
  },
  {
    category: "Lose Weight",
    exercises: [
      { name: "Jumping Jacks", sets: 3, reps: 30 },
      { name: "Burpees", sets: 3, reps: 15 },
      { name: "Running", sets: 1, reps: 20 },
    ],
  },
  {
    category: "Maintain Fitness",
    exercises: [
      { name: "Plank", sets: 3, reps: 60 },
      { name: "Yoga", sets: 1, reps: 20 },
      { name: "Jogging", sets: 1, reps: 15 },
    ],
  },
];

export const dietPlans = [
  {
    category: "Build Muscle",
    meals: [
      {
        id: 1,
        name: "Protein Oat Shake Bowl",
        type: "Breakfast",
        description:
          "High protein breakfast shake combining oats, milk, and protein powder, supporting muscle growth, energy, recovery, and sustained morning fullness levels",
        image: "https://source.unsplash.com/800x600/?oats,protein,shake",
        keywords: ["muscle gain", "protein shake"],
      },
      {
        id: 2,
        name: "High Protein Chicken Rice Bowl",
        type: "Lunch",
        description:
          "Grilled chicken served with rice providing lean protein, carbohydrates, aiding muscle recovery, strength building, and balanced daily nutrition intake support",
        image: "https://source.unsplash.com/800x600/?chicken,rice,bowl",
        keywords: ["lean protein", "rice bowl"],
      },
      {
        id: 3,
        name: "Beef Sweet Potato Power Plate",
        type: "Dinner",
        description:
          "Beef paired with sweet potatoes delivering high protein, complex carbs, improving muscle gain, energy levels, and post workout recovery support",
        image: "https://source.unsplash.com/800x600/?beef,sweet,potato",
        keywords: ["mass gain", "beef meal"],
      },
    ],
  },
  {
    category: "Lose Weight",
    meals: [
      {
        id: 4,
        name: "Keto Avocado Egg Plate",
        type: "Breakfast",
        description:
          "Eggs and avocado keto breakfast rich in healthy fats, protein, promoting fat loss, sustained energy, and appetite control throughout day",
        image: "https://source.unsplash.com/800x600/?eggs,avocado,keto",
        keywords: ["keto", "healthy fats"],
      },
      {
        id: 5,
        name: "Keto Chicken Avocado Salad",
        type: "Lunch",
        description:
          "Chicken avocado salad low carb meal supporting ketosis, fat burning, muscle preservation, and providing essential nutrients for weight loss journey",
        image: "https://source.unsplash.com/800x600/?chicken,salad,avocado",
        keywords: ["low carb", "keto salad"],
      },
      {
        id: 6,
        name: "Grilled Salmon Veggie Bowl",
        type: "Dinner",
        description:
          "Grilled salmon served with vegetables delivering omega three fats, improving metabolism, aiding fat loss, heart health, and balanced nutrition diet",
        image: "https://source.unsplash.com/800x600/?salmon,vegetables",
        keywords: ["omega 3", "fat loss"],
      },
    ],
  },
  {
    category: "Maintain Fitness",
    meals: [
      {
        id: 7,
        name: "Fruit Yogurt Balanced Bowl",
        type: "Breakfast",
        description:
          "Fresh fruits mixed with yogurt providing probiotics, vitamins, maintaining digestion, steady energy, and overall balanced nutrition for daily wellness support",
        image: "https://source.unsplash.com/800x600/?fruit,yogurt",
        keywords: ["probiotics", "healthy breakfast"],
      },
      {
        id: 8,
        name: "Healthy Veggie Wrap",
        type: "Lunch",
        description:
          "Whole wheat veggie wrap packed with fiber rich vegetables supporting digestion, heart health, and sustained energy for active lifestyle needs",
        image: "https://source.unsplash.com/800x600/?veggie,wrap",
        keywords: ["fiber", "healthy wrap"],
      },
      {
        id: 9,
        name: "Fish Rice Balanced Plate",
        type: "Dinner",
        description:
          "Fish served with rice offering lean protein, omega fats, supporting brain function, muscle maintenance, and balanced everyday nutrition intake support",
        image: "https://source.unsplash.com/800x600/?fish,rice",
        keywords: ["omega fats", "balanced meal"],
      },
    ],
  },
];