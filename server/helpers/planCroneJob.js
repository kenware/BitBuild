
import cron from 'node-cron';
import { Plan } from '../models';

const cronJob = () => cron.schedule('0 0 1 * * *', async () => {
  const plans = await Plan.findAll();
  plans.forEach(async (plan) => {
    const today = new Date().getDay() + 1;
    const lastUpdataed = new Date(plan.updatedAt).getDay();
    if (today === lastUpdataed) {
      const interest = Number(plan.principal) * 0.05;
      const amount = Number(plan.amount) + interest;
      await plan.update({ amount });
    }
  });
});
export default cronJob;
