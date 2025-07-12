import { StyleSheet, View } from 'react-native';
import getStyles from "@/lib/styles";

type BigCardSkeletonProps = {
    numberOfCards?: number
}

export default function BigCardSkeleton({ numberOfCards = 2 }: BigCardSkeletonProps) {
    const styles = getStyles();

    return (
        new Array(numberOfCards).fill(null).map((item, index) => (
            <View style={styles.bigSkeletonCard} key={index}>
                <View style={[styles.bigSkeletonCardTitle]} />
                <View>
                    {
                        new Array(7).fill(null).map((item, index) => (
                            <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                                <View style={{ flex: 3 }}>
                                    <View style={[styles.itemTitleSkeleton, { width: '80%' }]} />
                                    <View style={[styles.itemSubtitleSkeleton, { width: '25%' }]} />
                                </View>
                                <View style={[styles.itemArabicSkeleton, { flex: 1 }]} />
                            </View>
                        ))
                    }
                </View>
            </View>
        ))
    )
}