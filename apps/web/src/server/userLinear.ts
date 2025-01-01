import { useCallback, useState } from "react"

import axios from "axios"
import { loadGetInitialProps } from "next/dist/shared/lib/utils"
import { cookies } from "next/headers"


// const LINEAR_CLIENT_ID = process.env.LINEAR_CLIENT_ID
// const LINEAR_REDIRECT_URL = process.env.LINEAR_REDIRECT_URL

// interface LinearIssue {
//   id: string
//   title: string
//   description: string
//   state: {
//     id: string
//     name: string
//   }
//   labels: {
//     nodes: {
//       id: string
//       name: string
//     }[]
//   }
//   dueDate: string
//   createdAt: string
//   updatedAt: string
//   priority: number
//   project: {
//     id: string
//     name: string
//   }
//   assignee: {
//     id: string
//     name: string
//   }
//   url: string
// }

const useLinear = ( accessToken: string) => {

//   const [issues, setIssues] = useState<LinearIssue[]>([])
//   const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

//   const makeRequest = useCallback(async (url: string, config: object = {}) => {
//     try {
//       setIsLoading(true)
//       setError(null)
//       const response = await axios.get(url, config)
//       console.log("res saju : ", response.data)
//       return response.data
//     } catch (error) {
//       console.error(`Error fetching data from ${url}:`, error)
//       setError("An error occurred while fetching data. Please try again later.")
//       throw error
//     } finally {
//       setIsLoading(false)
//     }
//   }, [])

  const handleLogin = useCallback(async () => {
    try {
      const response = await axios.get(`/api/auth/linear`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      console.log("response saju : ", response.data)
      const { authUrl } = response.data

      console.log("Redirecting to Linear OAuth URL:")
      window.location.href = authUrl
    } catch (error) {
      console.error("Error in initiating Linear OAuth login:", error)
      setError("Failed to initiate Linear login")
    }
  }, [accessToken])

//   const handleRevoke = useCallback(async () => {
//     try {
//       await axios.post(
//         `${BACKEND_URL}/linear/revoke-access/`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${session}`,
//           },
//         }
//       )
//     } catch (error) {
//       console.error("Failed to revoke: ", error)
//       setError("Failed to revoke linear")
//     }
//   }, [session])

//   const getAccessToken = useCallback(
//     async (code: string) => {
//       if (!LINEAR_CLIENT_ID || !LINEAR_REDIRECT_URL) {
//         setError("Missing Linear OAuth configuration.")
//         throw new Error("Missing Linear OAuth configuration.")
//       }

//       try {
//         const params = new URLSearchParams()
//         params.append("client_id", LINEAR_CLIENT_ID)
//         params.append("redirect_uri", LINEAR_REDIRECT_URL)
//         params.append("code", code)
//         params.append("grant_type", "authorization_code")

//         const data = await makeRequest(`https://linear.app/oauth/token`, {
//           method: "POST",
//           headers: { "Content-Type": "application/x-www-form-urlencoded" },
//           data: params,
//         })
//         return data.access_token
//       } catch (error) {
//         setError("Failed to get Linear access token")
//         throw error
//       }
//     },
//     [makeRequest]
//   )

//   const fetchIssues = useCallback(
//     async (endpoint: string) => {
//       try {
//         const data = await makeRequest(
//           `https://api.linear.app/issues/${endpoint}`,
//           {
//             headers: { Authorization: `Bearer ${session}` },
//           }
//         )
//         setIssues(data.issues)
//       } catch (error) {
//         setError(`Failed to fetch Linear issues from ${endpoint}`)
//       }
//     },
//     [session, makeRequest]
//   )

  return {
    handleLogin,
    // handleRevoke,
    // getAccessToken,
    // fetchMyIssues: () => fetchIssues("my"),
    // fetchTodayIssues: () => fetchIssues("today"),
    // fetchOverdueIssues: () => fetchIssues("overdue"),
    // fetchIssuesByDate: (date: string) => fetchIssues(date),
    // issues,
    // isLoading,
    // error,
  }
}

export default useLinear
