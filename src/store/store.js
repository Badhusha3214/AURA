
export const initialState = () => {
    return {

        counter: 0,
        isLoggedIn: false,
        user: {
            email: null,
        },

        enrollData: {
            
            // mode: "regular",
            // periodLength: 5,
            // cycleLength: 28,

            // mode: "irregular",
            // periodLength: {
            //     start: 3,
            //     end: 7
            // },
            // cycleLength: {
            //     start: 25,
            //     end: 30
            // },
            

            mode: null,
            periodLength: null,
            cycleLength: null,
            conceive: null,
            lastMenstrualPeriod: null,
        }

    };
};

