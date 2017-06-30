export function go (url, $router) {
  if (/^javas/.test(url) || !url) return
  const useRouter = typeof url === 'object' || ($router && typeof url === 'string' && !/^(\/\/|https?|tel:)/.test(url))
  if (useRouter) {
    $router.push(url)
  } else {
    window.location.href = url
  }
}