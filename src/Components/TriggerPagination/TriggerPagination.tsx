import { useEffect } from "react"
import { IPagination } from "../../Types/IPagination"


interface ITriggerPagination<T> {
  elementId: string,
  setPagination: React.Dispatch<React.SetStateAction<IPagination<T>>>,
  rootId?: string
}

export const TriggerPagination = <T,>({
  elementId,
  setPagination,
  rootId
}: ITriggerPagination<T>) => {

  useEffect(() => {

    const callbackObserver = (entries: IntersectionObserverEntry[]) => {

      if (!entries[0].isIntersecting) return

      setPagination(prev => {
        if (!prev.hasMore) return prev
        return { ...prev, pageIndex: prev.pageIndex + 1 }
      })
    }

    const elementToObserve = document.getElementById(elementId)
    const rootElement = rootId ? document.getElementById(rootId) : null

    const observer = new IntersectionObserver(callbackObserver, {
      root: rootElement ?? null,
      rootMargin: '0px',
      threshold: 0.1,
    })

    if (elementToObserve) {
      observer.observe(elementToObserve)
    }

    return () => observer.disconnect();

  }, [])

  return null
}
