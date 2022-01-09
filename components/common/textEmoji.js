import React from 'react'
import annotations from 'emoji-annotation-to-unicode';
import emoticons from 'emoji-emoticon-to-unicode';
import escapeStringRegexp from 'escape-string-regexp';
import assign from 'object-assign';
import compact from 'lodash.compact';
import Image from "next/image"


function TextEmoji({ text }) {
    const specialEmoticons = { ':/': '1f615' };
    const specialEmoticonsRegex = "\\:\\/(?!\\/)";

    let getEscapedKeys = (hash) => {
        return Object.keys(hash)
            .map(x => escapeStringRegexp(x))
            .join('|');
    };


    const emojiWithEmoticons = {
        delimiter: new RegExp(`(:(?:${getEscapedKeys(annotations)}):|${getEscapedKeys(emoticons)}|${specialEmoticonsRegex})`, 'g'),
        dict: assign(annotations, emoticons, specialEmoticons)
    };

    const buildImageUrl = (hex, options) => {
        if (options.host) {
            return compact([options.host, options.path, `${hex}.${options.ext}`]).join('/');
        } else if (options.emojiType === 'twemoji') {
            return `https://twemoji.maxcdn.com/${options.ext}/${hex}.${options.ext}`;
        } else if (options.emojiType === 'emojione') {
            return `http://cdn.jsdelivr.net/emojione/assets/${options.ext}/${hex.toUpperCase()}.${options.ext}`;
        } else {
            throw new Error('Invalid emojiType is passed');
        }
    };
    let getKey = (key) => {
        if (key.match(/^:.*:$/)) {
            return key.replace(/^:/, '').replace(/:$/, '');
        } else {
            return key;
        }
    };


    let emojifyText = (text, options) => {
        let { delimiter, dict } = emojiWithEmoticons;
        let finalText =
            compact(
                text.split(delimiter).map(function (word, index) {
                    let match = word.match(delimiter);
                    if (!!options.strict && word !== '' && match === null) throw new Error(`Could not find emoji: ${word}.`);
                    if (match) {
                        let hex = dict[getKey(match[0])];
                        if (hex === null) return word;
                        return (<Image key={index} src={buildImageUrl(hex, options)} alt={hex} width={20} height={20}></Image>);
                    } else {
                        return word;
                    }
                })
            );
        return finalText
    };
    const buildOptions = (options) => {
        let hash = {
            useEmoticon: true,
            emojiType: 'twemoji',
            host: options.host || '',
            path: options.path || '',
            ext: options.ext || 'svg',
            singleEmoji: true,
            strict: false
        };
        hash.attributes = assign({ width: '20px', height: '20px' }, options.attributes);
        return hash;
    };
    return (
        <div className="text-sm text-gray-500 w-full h-20 border-gray-50 rounded-lg p-2 border-2 align-middle items-center justify-start" >
            <span>{emojifyText(text, buildOptions({}))}</span>
        </div>
    )
}

export default TextEmoji
