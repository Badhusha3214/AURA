
export const initialState = () => {
    return {
            checkbox:"",
            conceive:"",
            duration_period:"",
            last_cycle_regular:"",
            last_cycle_irregular_start:"",
            last_cycle_irregular_last:"",
            last_period_start:"",
            email:""
            // checkbox:"true",         final checkbox
            // conceive:"true",         step1
            // duration_period:"5",     step2
            // last_cycle_regular:"4",                  step3 regular
            // last_cycle_irregular_start:"2",          step3 irregular
            // last_cycle_irregular_last:"5",           step3 irregular
            // last_period_start:"25-03-2024",          step4
            // email:"nithindaniel2018@gmail.com"
    };
};
export const UserDetails = () => {
    return {

        counter: 0,
        isLoggedIn: false,
        user: {}
        
    };
};