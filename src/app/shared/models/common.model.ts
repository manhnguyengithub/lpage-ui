export interface DeviceInfo {
    os: string,
    osName: string,
    osVersion: string,
    browser: string,
    browserName: string,
    browserVersion: string,
    device: string,
}

export function getDeviceInfo(): DeviceInfo {
    const userAgent = navigator.userAgent;

    // Get OS information with version
    let osName = 'Unknown';
    let osVersion = 'Unknown';
    if (userAgent.match(/Windows/i)) {
        osName = 'Windows';
        osVersion = userAgent.match(/Windows NT (\d+\.\d+)/i) ? userAgent.match(/Windows NT (\d+\.\d+)/i)[1] : 'Unknown';
    } else if (userAgent.match(/Mac/i)) {
        osName = 'MacOS';
        osVersion = userAgent.match(/Mac OS X (\d+_\d+)/i) ? userAgent.match(/Mac OS X (\d+_\d+)/i)[1].replace('_', '.') : 'Unknown';
    } else if (userAgent.match(/Linux/i)) {
        osName = 'Linux';
        osVersion = 'Unknown';
    } else if (userAgent.match(/Android/i)) {
        osName = 'Android';
        osVersion = userAgent.match(/Android (\d+\.\d+)/i) ? userAgent.match(/Android (\d+\.\d+)/i)[1] : 'Unknown';
    } else if (userAgent.match(/iOS/i)) {
        osName = 'iOS';
        osVersion = userAgent.match(/OS (\d+\d+)/i) ? userAgent.match(/OS (\d+\d+)/i)[1].replace('_', '.') : 'Unknown';
    }
    let os = osName !== 'Unknown' ? (osVersion !== 'Unknown' ? `${osName} ${osVersion}` : osName) : 'Unknown';

    // Get browser information with version
    let browserName = 'Unknown';
    let browserVersion = 'Unknown';
    if (userAgent.match(/Chrome/i)) {
        browserName = 'Chrome';
        browserVersion = userAgent.match(/Chrome\/([\d.]+)/i) ? userAgent.match(/Chrome\/([\d.]+)/i)[1] : 'Unknown';
    } else if (userAgent.match(/Firefox/i)) {
        browserName = 'Firefox';
        browserVersion = userAgent.match(/Firefox\/(\d+\.\d+)/i) ? userAgent.match(/Firefox\/(\d+\.\d+)/i)[1] : 'Unknown';
    } else if (userAgent.match(/Safari/i)) {
        browserName = 'Safari';
        browserVersion = userAgent.match(/Version\/([\d.]+)/i) ? userAgent.match(/Version\/([\d.]+)/i)[1] : 'Unknown';
    } else if (userAgent.match(/Edge/i)) {
        browserName = 'Microsoft Edge';
        browserVersion = userAgent.match(/Edge\/([\d.]+)/i) ? userAgent.match(/Edge\/([\d.]+)/i)[1] : 'Unknown';
    } else if (userAgent.match(/Opera/i)) {
        browserName = 'Opera';
        browserVersion = userAgent.match(/Opera\/([\d.]+)/i) ? userAgent.match(/Opera\/([\d.]+)/i)[1] : 'Unknown';
    } else if (userAgent.match(/IE/i)) {
        browserName = 'Internet Explorer';
        browserVersion = userAgent.match(/MSIE (\d+\.\d+)/i) ? userAgent.match(/MSIE (\d+\.\d+)/i)[1] : 'Unknown';
    }
    let browser = browserName !== 'Unknown' ? (browserVersion !== 'Unknown' ? `${browserName}${browserVersion ? ' ' + browserVersion : ''}` : browserName) : 'Unknown';

    // Get device information
    let device;
    if (userAgent.match(/Mobile/i)) {
        device = 'Mobile';
    } else if (userAgent.match(/Tablet/i)) {
        device = 'Tablet';
    } else {
        device = 'Desktop';
    }

    return { os, osName, osVersion, browser, browserName, browserVersion, device };
}
