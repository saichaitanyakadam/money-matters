import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const BarChartView = ({graphData}) => (
  <ResponsiveContainer width="100%" height={400}>
    <BarChart
      width={500}
      height={300}
      data={graphData}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend verticalAlign="top" align="right" />
      <Bar
        dataKey="credit"
        fill="#4D78FF"
        label={{position: 'top', fill: '#000'}}
      />
      <Bar
        dataKey="debit"
        fill="#FCAA0B"
        label={{position: 'top', fill: '#000'}}
      />
    </BarChart>
  </ResponsiveContainer>
)

export default BarChartView
