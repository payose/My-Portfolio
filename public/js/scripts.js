    const date1 = new Date("08/01/2020");
    const date2 = new Date();

    
    const Difference_In_year = date2.getFullYear() - date1.getFullYear();
    const Difference_In_months = date2.getMonth() - date1.getMonth();
    const Difference_In_days = date2.getDate() - date1.getDate();
    let date = `${Difference_In_year} year, ${Difference_In_months} Months, and ${Difference_In_days} days`

document.getElementById('date').innerHTML= date