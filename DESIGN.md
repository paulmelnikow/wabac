Design notes
============

- initialize
    - initialize from cli
- reinit

- fetch latest version
- fetch latest version with max age
- fetch latest version, no later than given date
- delete from cache
    - for a page that is gone
- store new version / update version
    - update last fetched date if key exists and content is the same
- clean all from cache

- use object create time as access time
- supplement with "refetched" metadata


```js
try {
  return versionedCache.get('key')
} catch (e) {
  if (e instanceof NeedsRevalidation) {
    const res = fetch()
    versionedCache.put('key', res)
    return res
  } else {
    throw
  }
}
```
