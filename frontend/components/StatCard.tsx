import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
  title: string;
  value: number;
  color?: string;
}

export default function StatCard({ title, value, color }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="hover:shadow-lg transition">
        <CardContent className="p-6">
          <p className="text-sm text-muted-foreground">{title}</p>
          <h2 className={`text-3xl font-bold ${color ?? ""}`}>
            {value}
          </h2>
        </CardContent>
      </Card>
    </motion.div>
  );
}
