/**
 * Government SuperApp - Simple Profile Screen
 * 
 * Basic user profile with government employee information
 */

import React from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Dummy user data
const USER_DATA = {
  name: "John Doe",
  id: "EMP-2024-001", 
  email: "john.doe@government.lk",
  department: "Ministry of Technology",
  position: "Senior Software Engineer",
  joinDate: "January 15, 2022",
  phone: "+94 71 234 5678",
};

/**
 * Profile info row component
 */
function InfoRow({ label, value, icon }: { label: string; value: string; icon: string }) {
  return (
    <View style={styles.infoRow}>
      <View style={styles.infoIconContainer}>
        <Ionicons name={icon as any} size={20} color="#2563EB" />
      </View>
      <View style={styles.infoContent}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  );
}

/**
 * Action button component
 */
function ActionButton({ label, icon, onPress }: { label: string; icon: string; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.actionButton} onPress={onPress}>
      <Ionicons name={icon as any} size={24} color="#2563EB" />
      <Text style={styles.actionLabel}>{label}</Text>
      <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
    </TouchableOpacity>
  );
}

/**
 * Main profile screen
 */
export default function ProfileScreen() {
  
  const handleAction = (action: string) => {
    Alert.alert("Coming Soon", `${action} feature will be available soon.`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Ionicons name="person" size={40} color="white" />
          </View>
          <Text style={styles.userName}>{USER_DATA.name}</Text>
          <Text style={styles.userPosition}>{USER_DATA.position}</Text>
        </View>
        
        {/* Personal Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          
          <View style={styles.infoContainer}>
            <InfoRow label="Employee ID" value={USER_DATA.id} icon="card-outline" />
            <InfoRow label="Email" value={USER_DATA.email} icon="mail-outline" />
            <InfoRow label="Phone" value={USER_DATA.phone} icon="call-outline" />
            <InfoRow label="Department" value={USER_DATA.department} icon="business-outline" />
            <InfoRow label="Join Date" value={USER_DATA.joinDate} icon="calendar-outline" />
          </View>
        </View>
        
        {/* Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          
          <View style={styles.actionsContainer}>
            <ActionButton 
              label="Edit Profile" 
              icon="create-outline" 
              onPress={() => handleAction("Edit Profile")}
            />
            <ActionButton 
              label="Change Password" 
              icon="lock-closed-outline" 
              onPress={() => handleAction("Change Password")}
            />
            <ActionButton 
              label="Help & Support" 
              icon="help-circle-outline" 
              onPress={() => handleAction("Help & Support")}
            />
          </View>
        </View>
        
        {/* App Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          
          <View style={styles.aboutContainer}>
            <Text style={styles.aboutText}>Government SuperApp</Text>
            <Text style={styles.versionText}>Version 1.0.0 (Demo)</Text>
            <Text style={styles.copyrightText}>Ministry of Technology</Text>
          </View>
        </View>
        
        {/* Logout */}
        <View style={styles.section}>
          <TouchableOpacity 
            style={styles.logoutButton}
            onPress={() => Alert.alert("Logout", "Logout feature coming soon.")}
          >
            <Ionicons name="log-out-outline" size={24} color="#dc2626" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
        
        {/* Bottom spacing */}
        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    marginBottom: 20,
    paddingTop:60
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  userPosition: {
    fontSize: 16,
    color: '#64748b',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  infoContainer: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 4,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  infoIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#eff6ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    color: '#1e293b',
    fontWeight: '500',
  },
  actionsContainer: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 4,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  actionLabel: {
    flex: 1,
    fontSize: 16,
    color: '#1e293b',
    marginLeft: 12,
  },
  aboutContainer: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  aboutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  versionText: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 8,
  },
  copyrightText: {
    fontSize: 12,
    color: '#9ca3af',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 12,
    justifyContent: 'center',
  },
  logoutText: {
    fontSize: 16,
    color: '#dc2626',
    fontWeight: '500',
    marginLeft: 8,
  },
});
