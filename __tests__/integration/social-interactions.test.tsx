import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { AuthProvider } from "@/contexts/auth-context"
import { SocialFeed } from "@/components/social-feed"

describe("Social Interactions Integration Tests", () => {
  beforeEach(() => {
    // Mock authenticated user
    const mockUser = {
      id: "test-user",
      name: "Test User",
      email: "test@example.com",
      username: "testuser",
      role: "user" as const,
      verified: false,
      joinDate: "January 2024",
      followers: 100,
      following: 50,
      posts: 10,
    }
    localStorage.setItem("project_access_user", JSON.stringify(mockUser))
  })

  test("user can like and unlike posts", async () => {
    render(
      <AuthProvider>
        <SocialFeed />
      </AuthProvider>,
    )

    await waitFor(() => {
      expect(screen.getByText("Test User")).toBeInTheDocument()
    })

    // Find like buttons
    const likeButtons = screen.getAllByRole("button", { name: /like/i })
    expect(likeButtons.length).toBeGreaterThan(0)

    // Click like button
    const firstLikeButton = likeButtons[0]
    const initialLikeCount = screen.getAllByText(/\d+/)[0] // Get first number (like count)

    fireEvent.click(firstLikeButton)

    // Verify like count increased
    await waitFor(() => {
      // The like button should now show as liked (different styling/state)
      expect(firstLikeButton).toHaveClass(/text-red-500/)
    })

    // Click again to unlike
    fireEvent.click(firstLikeButton)

    await waitFor(() => {
      // Should return to unliked state
      expect(firstLikeButton).not.toHaveClass(/text-red-500/)
    })
  })

  test("user can bookmark and unbookmark posts", async () => {
    render(
      <AuthProvider>
        <SocialFeed />
      </AuthProvider>,
    )

    await waitFor(() => {
      expect(screen.getByText("Test User")).toBeInTheDocument()
    })

    // Find bookmark buttons
    const bookmarkButtons = screen.getAllByRole("button", { name: /bookmark/i })
    expect(bookmarkButtons.length).toBeGreaterThan(0)

    const firstBookmarkButton = bookmarkButtons[0]

    // Click bookmark button
    fireEvent.click(firstBookmarkButton)

    // Verify bookmark state changed
    await waitFor(() => {
      expect(firstBookmarkButton).toHaveClass(/text-purple-500/)
    })

    // Click again to unbookmark
    fireEvent.click(firstBookmarkButton)

    await waitFor(() => {
      expect(firstBookmarkButton).not.toHaveClass(/text-purple-500/)
    })
  })

  test("post creation updates feed immediately", async () => {
    render(
      <AuthProvider>
        <SocialFeed />
      </AuthProvider>,
    )

    await waitFor(() => {
      expect(screen.getByPlaceholderText(/what's happening/i)).toBeInTheDocument()
    })

    const postContent = "This is a new test post with unique content!"
    const postInput = screen.getByPlaceholderText(/what's happening/i)
    const postButton = screen.getByRole("button", { name: /post/i })

    // Create new post
    fireEvent.change(postInput, { target: { value: postContent } })
    fireEvent.click(postButton)

    // Verify post appears at top of feed
    await waitFor(() => {
      expect(screen.getByText(postContent)).toBeInTheDocument()
    })

    // Verify input is cleared
    expect(postInput).toHaveValue("")

    // Verify post has correct metadata
    expect(screen.getByText("now")).toBeInTheDocument() // timestamp
    expect(screen.getByText("Test User")).toBeInTheDocument() // author name
  })

  test("social media actions work with different user roles", async () => {
    // Test with founder account
    const founderUser = {
      id: "founder-001",
      name: "Jemael Xenn",
      email: "founder@projectaccess.co",
      username: "jemael",
      role: "founder" as const,
      verified: true,
      joinDate: "January 2024",
      followers: 2500000,
      following: 1000,
      posts: 1250,
    }
    localStorage.setItem("project_access_user", JSON.stringify(founderUser))

    render(
      <AuthProvider>
        <SocialFeed />
      </AuthProvider>,
    )

    await waitFor(() => {
      expect(screen.getByText("Jemael Xenn")).toBeInTheDocument()
    })

    // Verify founder badge is displayed
    expect(screen.getByText("Founder")).toBeInTheDocument()

    // Create a post as founder
    const postInput = screen.getByPlaceholderText(/what's happening/i)
    const postButton = screen.getByRole("button", { name: /post/i })

    fireEvent.change(postInput, { target: { value: "Founder announcement!" } })
    fireEvent.click(postButton)

    await waitFor(() => {
      expect(screen.getByText("Founder announcement!")).toBeInTheDocument()
    })

    // Verify founder badge appears on the new post
    const founderBadges = screen.getAllByText("Founder")
    expect(founderBadges.length).toBeGreaterThan(1) // Should appear multiple times
  })
})
