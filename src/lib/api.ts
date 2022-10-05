interface Post {
    id: string
    title: string
    subTitle: string
    body: HTMLElement
    thumbnail: string
  }
  
  const serviceId = process.env.NEXT_PUBLIC_MICRO_CMS_SERVICE_ID
  const baseUrl:string = `https://${serviceId}.microcms.io/api/v1`
  
  const apiKey = process.env.NEXT_PUBLIC_MICRO_CMS_API_KEY
  const writeApiKey = process.env.NEXT_PUBLIC_MICRO_CMS_WRITE_API_KEY

  console.log(serviceId)
  console.log(apiKey)
  console.log(writeApiKey)

  const params = (method: string, data?: {}) => {
    if (data) {
      return {
        "method": method,
        "headers": {
          "Content-Type": "application/json; charset=utf-8",
          "X-MICROCMS-API-KEY": apiKey
        },
        "body": JSON.stringify(data)
      }
    } else {
      return {
        "method": method,
        "headers": {
          "X-MICROCMS-API-KEY": apiKey
        }
      }
    }
  }
  
  // 記事を全件取得
  export const fetchAllPosts = async (): Promise<Post[]> => {
    const data = await fetch(`${baseUrl}/blog`, params("GET"))
    .then(res => res.json())
    .catch(() => null)
  
    if (data.contents) {
      return data.contents
    }
  }
  
  // IDから個別の記事を取得
  export const fetchPostById = async (id: string): Promise<Post> => {
    const data = await fetch(`${baseUrl}/blog/${id}`, params("GET"))
    .then(res => res.json())
    .catch(() => null)
  
    if (data) {
      return data
    }  
  }
  
  // ページ番号によって記事を取得
  export const fetchPostsByPageNumber = async (pageNumber: number, limit: number): Promise<Post[]> => {
    const data = await fetch(`${baseUrl}/blog?offset=${(pageNumber - 1) * 6}&limit=${limit}`, params("GET"))
    .then(res => res.json())
    .catch(() => null)
  
    if (data.contents) {
      return data.contents
    }
  }
  
  // 最新の記事のみを取得
  export const fetchLatestPosts = async (limit: number): Promise<Post[]> => {
    const data = await fetch(`${baseUrl}/blog?limit=${limit}`, params("GET"))
    .then(res => res.json())
    .catch(() => null)
  
    if (data.contents) {
      return data.contents
    }
  }
  
  // お問い合わせを作成
  export const createContact = async (data: {}) => {
    await fetch(`${baseUrl}/contacts`, params("POST", data))
  }