// utils/helper.ts
export const getStartAndEndOfMonth = (month: number) => {
    const now = new Date();
    const year = now.getFullYear();
  
    // Start of the selected month (1st day)
    const startOfMonth = new Date(year, month, 1);
    
    // End of the selected month (last day)
    const endOfMonth = new Date(year, month + 1, 0); // 0th day of next month gives us the last day of the current month
  
    // Return start and end dates in ISO format (API can handle ISO format)
    return {
      startDate: startOfMonth.toISOString(),
      endDate: endOfMonth.toISOString(),
    };
  };
  