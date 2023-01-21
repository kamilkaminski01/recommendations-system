

export function UrlParams(paramName) {
    const type = window.location.href.substring(window.location.href.lastIndexOf('?') + 1);
    const queryParams = new URLSearchParams(type);
    const isNaturalPersonQuery = queryParams.get(paramName);
    return ( isNaturalPersonQuery);
}