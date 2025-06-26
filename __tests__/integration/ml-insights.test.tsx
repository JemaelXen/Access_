import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { MLInsightsDashboard } from "@/components/ml-insights-dashboard"

describe("ML Insights Integration Tests", () => {
  test("ml dashboard displays models and predictions", async () => {
    render(<MLInsightsDashboard />)

    // Verify ML overview metrics
    expect(screen.getByText("Total Predictions")).toBeInTheDocument()
    expect(screen.getByText("Model Accuracy")).toBeInTheDocument()
    expect(screen.getByText("Active Models")).toBeInTheDocument()

    // Verify ML models are listed
    await waitFor(() => {
      expect(screen.getByText("Capacity Predictor")).toBeInTheDocument()
      expect(screen.getByText("Anomaly Detector")).toBeInTheDocument()
      expect(screen.getByText("User Behavior Analyzer")).toBeInTheDocument()
    })
  })

  test("ml predictions tab shows actionable insights", async () => {
    render(<MLInsightsDashboard />)

    // Navigate to predictions tab
    const predictionsTab = screen.getByRole("tab", { name: /predictions/i })
    fireEvent.click(predictionsTab)

    await waitFor(() => {
      expect(screen.getByText("AI-Generated Predictions")).toBeInTheDocument()
    })

    // Verify predictions are displayed with confidence levels
    expect(screen.getByText(/database storage will reach/i)).toBeInTheDocument()
    expect(screen.getByText(/confidence level/i)).toBeInTheDocument()

    // Test action buttons on high-impact predictions
    const urgentButtons = screen.getAllByRole("button", { name: /urgent action required/i })
    if (urgentButtons.length > 0) {
      fireEvent.click(urgentButtons[0])
      // Would verify action is taken
    }
  })

  test("anomaly detection shows real-time alerts", async () => {
    render(<MLInsightsDashboard />)

    // Navigate to anomalies tab
    const anomaliesTab = screen.getByRole("tab", { name: /anomaly detection/i })
    fireEvent.click(anomaliesTab)

    await waitFor(() => {
      expect(screen.getByText("Anomaly Detection")).toBeInTheDocument()
    })

    // Verify anomalies are categorized by severity
    expect(screen.getByText(/critical/i)).toBeInTheDocument()
    expect(screen.getByText(/warning/i)).toBeInTheDocument()

    // Test anomaly investigation
    const investigateButtons = screen.getAllByRole("button", { name: /investigate/i })
    if (investigateButtons.length > 0) {
      fireEvent.click(investigateButtons[0])
      // Would verify investigation workflow
    }
  })

  test("auto-optimization shows system improvements", async () => {
    render(<MLInsightsDashboard />)

    // Navigate to optimization tab
    const optimizationTab = screen.getByRole("tab", { name: /auto-optimization/i })
    fireEvent.click(optimizationTab)

    await waitFor(() => {
      expect(screen.getByText("Automated Optimizations")).toBeInTheDocument()
    })

    // Verify recent optimizations are shown
    expect(screen.getByText(/database query optimization/i)).toBeInTheDocument()
    expect(screen.getByText(/cache configuration tuning/i)).toBeInTheDocument()

    // Verify optimization impact metrics
    expect(screen.getByText(/performance improvement/i)).toBeInTheDocument()
    expect(screen.getByText(/cost reduction/i)).toBeInTheDocument()
  })
})
