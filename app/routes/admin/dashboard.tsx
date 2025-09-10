import { getAllUsers, getUser, storeUserData } from "~/appwrite/auth"; // ✅ 引入 storeUserData
import {
  getTripsByTravelStyle,
  getUserGrowthPerDay,
  getUsersAndTripsStats,
} from "~/appwrite/dashboard";
import { getAllTrips } from "~/appwrite/trips";
import { parseTripData } from "~/lib/utils";
// ...其他 import 保持不動

export const clientLoader = async () => {
  let user = await getUser();

  // ✅ 新使用者第一次登入時，寫入資料庫
  if (user && !(user as any).$id) {
    try {
      await storeUserData();
      // 重新取得 user 資料以保證 loaderData 正確
      user = await getUser();
    } catch (error) {
      console.error("Error storing new user data:", error);
    }
  }

  const [dashboardStats, trips, userGrowth, tripsByTravelStyle, allUsers] =
    await Promise.all([
      getUsersAndTripsStats(),
      getAllTrips(4, 0),
      getUserGrowthPerDay(),
      getTripsByTravelStyle(),
      getAllUsers(4, 0),
    ]);

  const allTrips = trips.allTrips.map(({ $id, tripDetails, imageUrls }) => ({
    id: $id,
    ...parseTripData(tripDetails),
    imageUrls: imageUrls ?? [],
  }));

  const mappedUsers: UsersItineraryCount[] = allUsers.users.map((user) => ({
    imageUrl: user.imageUrl,
    name: user.name,
    count: user.itineraryCount ?? Math.floor(Math.random() * 10),
  }));

  return {
    user,
    dashboardStats,
    allTrips,
    userGrowth,
    tripsByTravelStyle,
    allUsers: mappedUsers,
  };
};
