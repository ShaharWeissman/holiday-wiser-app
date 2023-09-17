import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Vacation } from '../types';
// import HttpService from '../Services/HttpService'

type VacationState = {
  vacations: Vacation[];
  filteredVacations: Vacation[];
};

const initialState: VacationState = {
  vacations: [],
  filteredVacations: [],
};

// First, create the thunk
// export const fetchVacationsAfterUserFollowChange = createAsyncThunk(
//     'vacations/toggleFollow',
//     async ({
//         vacationId,
//         isFollowing,
//     }: {
//         vacationId: number
//         isFollowing: boolean
//     }): Promise<Vacation[]> => {
//         if (isFollowing) {
//             await HttpService.ToggleUnFollow(vacationId)
//         } else {
//             await HttpService.ToggleFollow(vacationId)
//         }

//         const vacations = await HttpService.getAllVacationsForUser()
//         return vacations
//     }
// )

const vacationSlice = createSlice({
  name: 'vacations',
  initialState,
  reducers: {
    setVacations: (state: VacationState, action: PayloadAction<Vacation[]>) => {
      state.vacations = action.payload;
    },
    filterByFollowed: (state) => {
      const filteredVacations = state.vacations.filter((vacation) => vacation.isFollowing > 0);
      if (filteredVacations.length > 0) {
        state.filteredVacations = filteredVacations;
      }
    },
    toggleFollow: (state: VacationState, action: PayloadAction<Vacation>) => {
      const vacation = action.payload;
      const storedVacation = state.vacations.find((v) => v.vacationId === vacation.vacationId);
      if (!storedVacation) {
        console.log('storedVacation not found');
        return;
      }
      const isFollowing = !!storedVacation.isFollowing;
      storedVacation.followersCount = isFollowing
        ? storedVacation.followersCount - 1
        : storedVacation.followersCount + 1;
      storedVacation.isFollowing = isFollowing ? 0 : 1;
    },
  },
  // extraReducers: (builder) => {
  //     // Add reducers for additional action types here, and handle loading state as needed
  //     builder
  //         .addCase(
  //             fetchVacationsAfterUserFollowChange.fulfilled,
  //             (state, action) => {
  //                 state.vacations = action.payload
  //             }
  //         )
  //         .addCase(filterByFollowed, (state) => {
  //             const filteredVacations = state.vacations.filter(
  //                 (vacation) => vacation.isFollowing > 0
  //             )
  //             if (filteredVacations.length > 0) {
  //                 state.filteredVacations = filteredVacations
  //             }
  //         })
  // },
});

export const { setVacations, toggleFollow, filterByFollowed } = vacationSlice.actions;
export default vacationSlice.reducer;
