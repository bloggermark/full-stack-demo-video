import { useState, useEffect } from "react"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ""

const Journal = () => {
  const [entries, setEntries] = useState([])
  const [csrfToken, setCsrfToken] = useState("")
  const [loading, setLoading] = useState(true)
  const [expandedEntry, setExpandedEntry] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [modalMode, setModalMode] = useState("create") // 'create' or 'edit'
  const [currentEntry, setCurrentEntry] = useState({
    title: "",
    html: "",
    author: "",
  })

  // Fetch CSRF token
  const fetchCsrfToken = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/csrf-token`, {
        credentials: "include",
      })
      const data = await response.json()
      setCsrfToken(data.csrfToken)
    } catch (error) {
      console.error("Failed to fetch CSRF token:", error)
    }
  }

  // Fetch journal entries
  const fetchEntries = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/blog`, {
        credentials: "include",
      })
      const data = await response.json()
      setEntries(data)
    } catch (error) {
      console.error("Failed to fetch entries:", error)
    } finally {
      setLoading(false)
    }
  }

  // Create new entry
  const createEntry = async (entryData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/blog`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
        },
        credentials: "include",
        body: JSON.stringify(entryData),
      })

      if (response.ok) {
        const newEntry = await response.json()
        setEntries([...entries, newEntry])
        setShowModal(false)
        setCurrentEntry({ title: "", html: "", author: "" })
      }
    } catch (error) {
      console.error("Failed to create entry:", error)
    }
  }

  // Update entry
  const updateEntry = async (id, entryData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/blog/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
        },
        credentials: "include",
        body: JSON.stringify(entryData),
      })

      if (response.ok) {
        const updatedEntry = await response.json()
        setEntries(
          entries.map((entry) => (entry.id === id ? updatedEntry : entry))
        )
        setShowModal(false)
        setCurrentEntry({ title: "", html: "", author: "" })
      }
    } catch (error) {
      console.error("Failed to update entry:", error)
    }
  }

  // Delete entry
  const deleteEntry = async (id) => {
    if (!confirm("Are you sure you want to delete this entry?")) return

    try {
      const response = await fetch(`${API_BASE_URL}/api/blog/${id}`, {
        method: "DELETE",
        headers: {
          "X-CSRF-Token": csrfToken,
        },
        credentials: "include",
      })

      if (response.ok) {
        setEntries(entries.filter((entry) => entry.id !== id))
      }
    } catch (error) {
      console.error("Failed to delete entry:", error)
    }
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    if (modalMode === "create") {
      createEntry(currentEntry)
    } else {
      updateEntry(currentEntry.id, currentEntry)
    }
  }

  // Open modal for editing
  const openEditModal = (entry) => {
    setCurrentEntry(entry)
    setModalMode("edit")
    setShowModal(true)
  }

  // Open modal for creating
  const openCreateModal = () => {
    setCurrentEntry({ title: "", html: "", author: "" })
    setModalMode("create")
    setShowModal(true)
  }

  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  useEffect(() => {
    fetchCsrfToken()
    fetchEntries()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Journal Entries</h1>
        <button
          onClick={openCreateModal}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          New Entry
        </button>
      </div>

      {entries.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No journal entries yet. Create your first one!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className="border border-gray-200 rounded-lg shadow-sm"
            >
              <button
                onClick={() =>
                  setExpandedEntry(expandedEntry === entry.id ? null : entry.id)
                }
                className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex justify-between items-center"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {entry.title}
                  </h3>
                  <div className="text-sm text-gray-500 mt-1">
                    By {entry.author} • {formatDate(entry.date)}
                  </div>
                </div>
                <svg
                  className={`w-5 h-5 transform transition-transform ${
                    expandedEntry === entry.id ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {expandedEntry === entry.id && (
                <div className="px-6 py-4 border-t border-gray-200">
                  <div
                    className="text-gray-700 mb-4 prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: entry.html }}
                  />
                  <div className="flex space-x-2">
                    <button
                      onClick={() => openEditModal(entry)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteEntry(entry.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {modalMode === "create" ? "Create New Entry" : "Edit Entry"}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={currentEntry.title}
                    onChange={(e) =>
                      setCurrentEntry({
                        ...currentEntry,
                        title: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Author
                  </label>
                  <input
                    type="text"
                    value={currentEntry.author}
                    onChange={(e) =>
                      setCurrentEntry({
                        ...currentEntry,
                        author: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Content (HTML)
                  </label>
                  <textarea
                    value={currentEntry.html}
                    onChange={(e) =>
                      setCurrentEntry({ ...currentEntry, html: e.target.value })
                    }
                    rows={10}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                    required
                    placeholder="<p>Your content here...</p>"
                  />
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    {modalMode === "create" ? "Create" : "Update"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Journal
