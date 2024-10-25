// 76. Minimum Window Substring



// Given two strings s and t of lengths m and n respectively, return the minimum window 
// substring
//  of s such that every character in t (including duplicates) is included in the window. If there is no such substring, return the empty string "".

// The testcases will be generated such that the answer is unique.





/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function(s, t) {
    if (s.length === 0 || t.length === 0) return "";

    // Create a frequency map for characters in t
    const charCount = {};
    for (const char of t) {
        charCount[char] = (charCount[char] || 0) + 1;
    }

    let required = Object.keys(charCount).length; // Number of unique characters in t
    let left = 0, right = 0; // Sliding window pointers
    let formed = 0; // Counts how many unique characters in t are currently in the window
    const windowCount = {}; // Current count of characters in the window
    let minLen = Infinity; // Minimum length of the substring found
    let minLeft = 0; // Starting index of the minimum substring

    while (right < s.length) {
        const char = s[right];
        windowCount[char] = (windowCount[char] || 0) + 1;

        // Check if the current character's frequency matches the required frequency
        if (charCount[char] && windowCount[char] === charCount[char]) {
            formed++;
        }

        // Try to contract the window until it ceases to be 'desirable'
        while (left <= right && formed === required) {
            const charLeft = s[left];

            // Update minimum window length and position
            if (right - left + 1 < minLen) {
                minLen = right - left + 1;
                minLeft = left;
            }

            // Remove the leftmost character from the window
            windowCount[charLeft]--;
            if (charCount[charLeft] && windowCount[charLeft] < charCount[charLeft]) {
                formed--;
            }
            left++;
        }

        // Expand the window by moving right pointer
        right++;
    }

    return minLen === Infinity ? "" : s.substring(minLeft, minLeft + minLen);
};