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
        left: 0,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="_id" />
      <YAxis />
      <Tooltip />
      <Legend verticalAlign="top" align="right" />
      <Bar
        dataKey="totalCredit"
        fill="#4D78FF"
        label={{position: 'inside', fill: '#000', fontSize: '12'}}
      />
      <Bar
        dataKey="totalDebit"
        fill="#FCAA0B"
        label={{position: 'inside', fill: '#000', fontSize: '12'}}
      />
    </BarChart>
  </ResponsiveContainer>
)

export default BarChartView
