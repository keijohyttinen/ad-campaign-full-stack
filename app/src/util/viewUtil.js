import React from 'react'
import {
    Text,
    View,
    TextInput,
} from 'react-native';

import _ from 'underscore';

function toViewParams(paramMap) {
    return _.map(paramMap, (value, key) => {
        return (
            <View key={key} style={{ flexDirection: 'row' }}>
                <View style={{ flexDirection: 'column', flex: 1 }}>
                    <Text style={{ marginBottom: 5 }}>
                        {`${key}`}
                    </Text>
                </View>
                <View style={{ flexDirection: 'column', flex: 1 }}>
                    <TextInput
                        style={{ marginBottom: 5 }}
                        onChangeText={(text) => this.setState({ text })}
                        value={value != null ? value.toString() : "N/A"}
                    />
                </View>
            </View>
        );
    });
}

exports.toViewParams = toViewParams;